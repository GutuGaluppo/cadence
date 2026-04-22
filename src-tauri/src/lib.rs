use tauri::{
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Listener, Manager,
};
use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

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
        .setup(|app| {
            let tray = TrayIconBuilder::new()
                .icon(tauri::include_image!("icons/tray-icon.png"))
                .icon_as_template(true)
                .tooltip("Cadence")
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        if let Some(window) = app.get_webview_window("main") {
                            if window.is_visible().unwrap_or(false) {
                                let _ = window.hide();
                            } else {
                                let _ = window.show();
                                let _ = window.set_focus();
                            }
                        }
                    }
                })
                .build(app)?;

            let tray_for_listener = tray.clone();
            app.listen("timer-tick", move |event: tauri::Event| {
                if let Ok(payload) = serde_json::from_str::<serde_json::Value>(event.payload()) {
                    let time_left = payload["timeLeft"].as_i64().unwrap_or(0);
                    let is_running = payload["isRunning"].as_bool().unwrap_or(false);

                    #[cfg(target_os = "macos")]
                    {
                        let title = if is_running {
                            let mins = time_left / 60;
                            let secs = time_left % 60;
                            Some(format!("{:02}:{:02}", mins, secs))
                        } else {
                            None
                        };
                        let _ = tray_for_listener.set_title(title.as_deref());
                    }
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
