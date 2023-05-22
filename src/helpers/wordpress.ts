import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { searchForFiles } from './files';

export function isWordPressProject(): boolean {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        const workspacePath = workspaceFolders[0].uri.fsPath;
        const wpConfigPath = path.join(workspacePath, 'wp-config.php');
        return fs.existsSync(wpConfigPath);
    }
    return false;
}

export function getActiveTheme(): string | null {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        const workspacePath = workspaceFolders[0].uri.fsPath;
        const themesPath = path.join(workspacePath, 'wp-content', 'themes');
        if (fs.existsSync(themesPath)) {
            let themes = fs.readdirSync(themesPath);
            themes = themes.filter(theme => !theme.startsWith('.'));
            if (themes.length > 0) {
                // Assume the most recently modified theme is the active one
                themes.sort((a, b) => {
                    const aPath = path.join(themesPath, a);
                    const bPath = path.join(themesPath, b);
                    return fs.statSync(bPath).mtime.getTime() - fs.statSync(aPath).mtime.getTime();
                });
                return themes[0];
            }
        }
    }
    return null;
}

export function getActiveThemePath(): string | null {
    const activeThemeName = getActiveTheme();
    if (isWordPressProject() && activeThemeName) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
            const workspacePath = workspaceFolders[0].uri.fsPath;
            return path.join(workspacePath, 'wp-content', 'themes', activeThemeName);
        }
    }
    return null;
}

export function searchForThemeFiles(fileNames: string[]): string | null {
    const activeThemePath = getActiveThemePath();
    if (activeThemePath) {
        return searchForFiles(activeThemePath, fileNames);
    }
    return null;
}