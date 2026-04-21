const Beginner_Commands = [
  { "command": "pwd", "description": "Print current working directory", "example": "pwd" },
  { "command": "ls", "description": "List files in directory", "example": "ls -l" },
  { "command": "cd", "description": "Change directory", "example": "cd /home/user" },
  { "command": "touch", "description": "Create empty file", "example": "touch file.txt" },
  { "command": "mkdir", "description": "Create new directory", "example": "mkdir projects" },
  { "command": "rmdir", "description": "Remove empty directory", "example": "rmdir old_folder" },
  { "command": "rm", "description": "Remove files or directories", "example": "rm file.txt" },
  { "command": "cp", "description": "Copy files or directories", "example": "cp file.txt backup.txt" },
  { "command": "mv", "description": "Move or rename files", "example": "mv file.txt docs/" },
  { "command": "cat", "description": "View file contents", "example": "cat notes.txt" },
  { "command": "less", "description": "View file contents page by page", "example": "less longfile.txt" },
  { "command": "head", "description": "Show first lines of file", "example": "head -n 10 file.txt" },
  { "command": "tail", "description": "Show last lines of file", "example": "tail -n 10 file.txt" },
  { "command": "echo", "description": "Print text to terminal", "example": "echo Hello World" },
  { "command": "man", "description": "Show manual for command", "example": "man ls" },
  { "command": "whoami", "description": "Show current user", "example": "whoami" },
  { "command": "uname", "description": "Show system info", "example": "uname -a" },
  { "command": "df", "description": "Show disk usage", "example": "df -h" },
  { "command": "du", "description": "Show directory size", "example": "du -sh /home/user" },
  { "command": "ps", "description": "List running processes", "example": "ps aux" },
  { "command": "top", "description": "Show active processes", "example": "top" },
  { "command": "kill", "description": "Terminate process", "example": "kill 1234" },
  { "command": "chmod", "description": "Change file permissions", "example": "chmod 755 script.sh" },
  { "command": "chown", "description": "Change file ownership", "example": "chown user:user file.txt" },
  { "command": "grep", "description": "Search text in files", "example": "grep 'error' logfile.txt" }
]

    const advancedCommands = [
  { "command": "alias", "description": "Create shortcut for commands", "example": "alias ll='ls -la'" },
  { "command": "find", "description": "Search for files in directories", "example": "find /home -name '*.txt'" },
  { "command": "locate", "description": "Quickly find files using database", "example": "locate config.json" },
  { "command": "xargs", "description": "Build and execute command lines from input", "example": "find . -name '*.log' | xargs rm" },
  { "command": "tar", "description": "Archive files into tarball", "example": "tar -czvf archive.tar.gz folder/" },
  { "command": "wget", "description": "Download files from web", "example": "wget https://example.com/file.zip" },
  { "command": "curl", "description": "Transfer data from or to server", "example": "curl -O https://example.com/file.zip" },
  { "command": "scp", "description": "Securely copy files between hosts", "example": "scp file.txt user@server:/path" },
  { "command": "rsync", "description": "Efficiently sync files/directories", "example": "rsync -avh source/ destination/" },
  { "command": "ssh", "description": "Connect to remote server securely", "example": "ssh user@192.168.1.10" },
  { "command": "netstat", "description": "Show network connections", "example": "netstat -tulnp" },
  { "command": "ss", "description": "Display socket statistics", "example": "ss -tulwn" },
  { "command": "iptables", "description": "Configure firewall rules", "example": "iptables -L" },
  { "command": "systemctl", "description": "Control systemd services", "example": "systemctl restart nginx" },
  { "command": "journalctl", "description": "View system logs", "example": "journalctl -u ssh" },
  { "command": "dmesg", "description": "Show kernel ring buffer messages", "example": "dmesg | tail" },
  { "command": "lsof", "description": "List open files and processes", "example": "lsof -i :80" },
  { "command": "htop", "description": "Interactive process viewer", "example": "htop" },
  { "command": "ncdu", "description": "Disk usage analyzer with ncurses UI", "example": "ncdu /home" },
  { "command": "awk", "description": "Pattern scanning and text processing", "example": "awk '{print $1}' file.txt" },
  { "command": "sed", "description": "Stream editor for text manipulation", "example": "sed 's/error/warning/g' logfile.txt" },
  { "command": "crontab", "description": "Schedule recurring tasks", "example": "crontab -e" },
  { "command": "at", "description": "Schedule one-time tasks", "example": "echo 'shutdown -h now' | at 23:00" },
  { "command": "env", "description": "Show or set environment variables", "example": "env | grep PATH" },
  { "command": "export", "description": "Set environment variable for session", "example": "export EDITOR=nano" }
]


export const sampleCommands = {
beginner: Beginner_Commands 
,advanced: advancedCommands
};
