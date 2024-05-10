import * as fs from 'fs';
import * as path from 'path';
import { isWordPressProject, searchForThemeFiles } from './wordpress';
import { isNextProject, searchForSrcFiles } from './next';

export function searchForFiles(base: string, fileNames: string[], rootOnly = false): string | null {
    const entries = fs.readdirSync(base, { withFileTypes: true });

    for (const fileName of fileNames) {
        for (const entry of entries) {
            const entryPath = path.join(base, entry.name);
            if (entry.isFile() && entry.name === fileName) {
                return entryPath;
            } else if (entry.isDirectory() && !rootOnly) {
                const nestedFilePath = searchForFiles(entryPath, [fileName]);
                if (nestedFilePath) {
                    return nestedFilePath;
                }
            }
        }
    }

    return null;
}

export function searchForProjectFiles(fileNames: string[]): string | null {
    if (isWordPressProject()) {
        return searchForThemeFiles(fileNames);
    } else if (isNextProject()) {
        return searchForSrcFiles(fileNames);
    } else {
        return null;
    }
}