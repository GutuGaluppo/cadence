cask "cadence" do
  version "0.1.0"

  on_arm do
    sha256 "REPLACE_WITH_SHA256_OF_Cadence_#{version}_aarch64.dmg"
    url "https://github.com/GutuGaluppo/cadence/releases/download/v#{version}/Cadence_#{version}_aarch64.dmg"
  end

  on_intel do
    sha256 "REPLACE_WITH_SHA256_OF_Cadence_#{version}_x64.dmg"
    url "https://github.com/GutuGaluppo/cadence/releases/download/v#{version}/Cadence_#{version}_x64.dmg"
  end

  name "Cadence"
  desc "Local-first Pomodoro desktop app for task-based focus sessions"
  homepage "https://gutugaluppo.github.io/cadence/"

  auto_updates false
  depends_on macos: ">= :big_sur"

  app "Cadence.app"

  zap trash: [
    "~/Library/Application Support/com.gutugaluppo.cadence",
    "~/Library/Saved Application State/com.gutugaluppo.cadence.savedState",
    "~/Library/WebKit/com.gutugaluppo.cadence",
  ]
end
