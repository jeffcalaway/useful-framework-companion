import * as fs from 'fs';
import * as path from 'path';

export function searchForFiles(base: string, fileNames: string[]): string | null {
    const entries = fs.readdirSync(base, { withFileTypes: true });

    for (const fileName of fileNames) {
        for (const entry of entries) {
            const entryPath = path.join(base, entry.name);
            if (entry.isFile() && entry.name === fileName) {
                return entryPath;
            } else if (entry.isDirectory()) {
                const nestedFilePath = searchForFiles(entryPath, [fileName]);
                if (nestedFilePath) {
                    return nestedFilePath;
                }
            }
        }
    }

    return null;
}