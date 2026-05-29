import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { searchForFiles } from './files';

export function isNextProject(): boolean {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        const configVariants = ['next.config.js', 'next.config.mjs', 'next.config.ts', 'next.config.cjs'];
        
        return workspaceFolders.some(folder => {
            const workspacePath = folder.uri.fsPath;
            return configVariants.some(configFile => {
                const configPath = path.join(workspacePath, configFile);
                return fs.existsSync(configPath);
            });
        });
    }
    return false;
}

export function getSrcPath(): string | null {
    if (isNextProject()) {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if (workspaceFolders) {
            const configVariants = ['next.config.js', 'next.config.mjs', 'next.config.ts', 'next.config.cjs'];
            
            for (const folder of workspaceFolders) {
                const workspacePath = folder.uri.fsPath;
                const hasNextConfig = configVariants.some(configFile => {
                    const configPath = path.join(workspacePath, configFile);
                    return fs.existsSync(configPath);
                });
                
                if (hasNextConfig) {
                    const srcPath = path.join(workspacePath, 'src');
                    if (fs.existsSync(srcPath)) {
                        return srcPath;
                    }
                }
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
                const configVariants = ['next.config.js', 'next.config.mjs', 'next.config.ts', 'next.config.cjs'];
                
                for (const folder of workspaceFolders) {
                    const workspacePath = folder.uri.fsPath;
                    const hasNextConfig = configVariants.some(configFile => {
                        const configPath = path.join(workspacePath, configFile);
                        return fs.existsSync(configPath);
                    });
                    
                    if (hasNextConfig) {
                        const result = searchForFiles(workspacePath, fileNames, true);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
        }
    }
    return null;
}