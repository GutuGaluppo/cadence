use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::TrayIconBuilder,
    AppHandle, Listener, Manager, RunEvent, Runtime, WindowEvent,
};
use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

#[cfg(target_os = "macos")]
mod tray_badge;
#[cfg(target_os = "macos")]
mod tray_ripple;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(
            SqlBuilder::default()
                .add_migrations(
                    "sqlite:cadence.db",
                    vec![
                        Migration {
                            version: 1,
                            description: "create_tasks_table",
                            sql: r#"
                                CREATE TABLE IF NOT EXISTS tasks (
                                    id TEXT PRIMARY KEY,
                                    title TEXT NOT NULL,
                                    completed INTEGER NOT NULL DEFAULT 0,
                                    pomodoro_count INTEGER NOT NULL DEFAULT 0,
                                    created_at INTEGER NOT NULL
                                );
                            "#,
                            kind: MigrationKind::Up,
                        },
                        Migration {
                            version: 2,
                            description: "add_task_focus_duration",
                            sql: "ALTER TABLE tasks ADD COLUMN focus_duration INTEGER",
                            kind: MigrationKind::Up,
                        },
                        Migration {
                            version: 3,
                            description: "add_task_short_break_duration",
                            sql: "ALTER TABLE tasks ADD COLUMN short_break_duration INTEGER",
                            kind: MigrationKind::Up,
                        },
                        Migration {
                            version: 4,
                            description: "add_task_long_break_duration",
                            sql: "ALTER TABLE tasks ADD COLUMN long_break_duration INTEGER",
                            kind: MigrationKind::Up,
                        },
                        Migration {
                            version: 5,
                            description: "add_task_cycles_before_long_break",
                            sql: "ALTER TABLE tasks ADD COLUMN cycles_before_long_break INTEGER",
                            kind: MigrationKind::Up,
                        },
                    ],
                )
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .on_window_event(|window, event| {
            // Closing the window only hides it; the app (and the timer) keeps
            // running in the menu bar until the user quits.
            if let WindowEvent::CloseRequested { api, .. } = event {
                if window.label() == "main" {
                    api.prevent_close();
                    let _ = window.hide();
                }
            }
        })
        .setup(|app| {
            let tray_icon = tauri::include_image!("icons/tray-icon.png");
            // The menu bar icon has its own colors, whatever the system
            // appearance, so it is not a template image there.
            #[cfg(target_os = "macos")]
            let tray_rings = tray_icon.clone();
            #[cfg(target_os = "macos")]
            let tray_icon = tray_badge::badge(&tray_rings);

            let countdown = MenuItem::with_id(app, "countdown", "--:--", false, None::<&str>)?;
            let open = MenuItem::with_id(app, "open", "Open Cadence", true, None::<&str>)?;
            // Closing the window keeps the app in the menu bar, so Quit lives here.
            let quit = MenuItem::with_id(app, "quit", "Quit Cadence", true, None::<&str>)?;
            let menu = Menu::with_items(
                app,
                &[
                    &countdown,
                    &PredefinedMenuItem::separator(app)?,
                    &open,
                    &PredefinedMenuItem::separator(app)?,
                    &quit,
                ],
            )?;

            #[cfg_attr(not(target_os = "macos"), allow(unused_variables))]
            let tray = TrayIconBuilder::new()
                .icon(tray_icon.clone())
                .icon_as_template(cfg!(not(target_os = "macos")))
                .tooltip("Cadence")
                .menu(&menu)
                .show_menu_on_left_click(true)
                .on_menu_event(|app, event| match event.id().as_ref() {
                    "open" => show_main_window(app),
                    "quit" => app.exit(0),
                    _ => {}
                })
                .build(app)?;

            // Only the macOS menu bar icon is animated while the timer runs.
            #[cfg(target_os = "macos")]
            let ripple = tray_ripple::TrayRipple::spawn(tray.clone(), &tray_rings);

            app.listen("timer-tick", move |event: tauri::Event| {
                if let Ok(payload) = serde_json::from_str::<serde_json::Value>(event.payload()) {
                    let time_left = payload["timeLeft"].as_i64().unwrap_or(0);
                    let _ =
                        countdown.set_text(format!("{:02}:{:02}", time_left / 60, time_left % 60));

                    #[cfg(target_os = "macos")]
                    ripple.set_running(payload["isRunning"].as_bool().unwrap_or(false));
                }
            });

            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|app, event| {
            // Clicking the Dock icon brings the hidden window back.
            #[cfg(target_os = "macos")]
            if let RunEvent::Reopen { .. } = event {
                show_main_window(app);
            }
            #[cfg(not(target_os = "macos"))]
            let _ = (app, event);
        });
}

fn show_main_window<R: Runtime>(app: &AppHandle<R>) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.unminimize();
        let _ = window.show();
        let _ = window.set_focus();
    }
}
