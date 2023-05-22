import * as vscode from 'vscode';
import * as path from 'path';
import { isWordPressProject, getActiveTheme } from '../helpers/wordpress';
import { searchForFiles } from '../helpers/files';

export class HeadingsButton {
    constructor() {}

    public getButtonDetails() {
        return {
            text: '$(text-size)', // Use any icon from VS Code's set of Octicons https://octicons.github.com/
            color: '#FFCB6B',
            tooltip: 'View Headings',
            command: 'extension.usefulFrameworkCompanion.headingsButton', // This is the command to run when the button is clicked
        };
    }

    async onButtonPress() {
        if (isWordPressProject()) {
            const activeThemeName = getActiveTheme();
            if (activeThemeName) {
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (workspaceFolders) {
                    const workspacePath = workspaceFolders[0].uri.fsPath;
                    const activeThemePath = path.join(workspacePath, 'wp-content', 'themes', activeThemeName);
                    const filePath = searchForFiles(
                        activeThemePath,
                        ['_headings.scss', 'headings.scss']
                    );
                    if (filePath) {
                        const document = await vscode.workspace.openTextDocument(filePath);
                        vscode.window.showTextDocument(document, vscode.ViewColumn.Active);
                    } else {
                        vscode.window.showInformationMessage('Could not find _variables.scss or _colors.scss in the active theme');
                    }
                }
            } else {
                vscode.window.showInformationMessage('Could not determine the active theme');
            }
        } else {
            vscode.window.showInformationMessage('This is not a WordPress project');
        }
    }
}
