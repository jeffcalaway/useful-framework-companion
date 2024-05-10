import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { searchForFiles } from './files';

export function isNextProject(): boolean {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        const workspacePath = workspaceFolders[0].uri.fsPath;
        const nextConfigPath = path.join(workspacePath, 'next.config.js');

        return fs.existsSync(nextConfigPath);
    }
    return false;
}

export function getSrcPath(): string | null {
    if (isNextProject()) {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if (workspaceFolders) {
            const workspacePath = workspaceFolders[0].uri.fsPath;
            const srcPath = path.join(workspacePath, 'src');

            if (fs.existsSync(srcPath)) {
                return srcPath;
            }
        }
    }
    return null;
}

export function searchForSrcFiles(fileNames: string[]): string | null {
    const srcPath = getSrcPath();
    if (srcPath) {
        const srcFiles = searchForFiles(srcPath, fileNames);

        if (srcFiles) {
            return srcFiles;
        } else {
            const workspaceFolders = vscode.workspace.workspaceFolders;
    
            if (workspaceFolders) {
                const workspacePath = workspaceFolders[0].uri.fsPath;
                return searchForFiles(workspacePath, fileNames, true);
            }
        }
    }
    return null;
}