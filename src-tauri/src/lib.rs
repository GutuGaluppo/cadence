// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

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
                    ],
                )
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}