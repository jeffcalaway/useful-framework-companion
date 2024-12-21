import * as vscode from 'vscode';
import { searchForProjectFiles } from '../helpers/files';

export class HeadingsButton {
    constructor() {}

    public getButtonDetails() {
        const fileNames = ['_headings.scss', 'headings.scss'];
        const filePath = searchForProjectFiles(fileNames);

        if (filePath) {
            return {
                text: '$(text-size)', // Use any icon from VS Code's set of Octicons https://octicons.github.com/
                color: '#FFCB6B',
                tooltip: 'View Headings',
                command: 'extension.usefulFrameworkCompanion.headingsButton', // This is the command to run when the button is clicked
            };
        }

        console.error('Useful Framework Companion: Could not find a HEADINGS file in the active project');
        return null;
    }

    async onButtonPress() {
        const fileNames = ['_headings.scss', 'headings.scss'];
        const filePath = searchForProjectFiles(fileNames);

        if (filePath) {
            const document = await vscode.workspace.openTextDocument(filePath);
            vscode.window.showTextDocument(document, vscode.ViewColumn.Active);
        } else {
            console.error('Useful Framework Companion: Could not find a HEADINGS file in the active project');
        }
    }
}
