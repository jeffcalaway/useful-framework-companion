import * as vscode from 'vscode';
import { searchForProjectFiles } from '../helpers/files';

export class FontsButton {
    constructor() {}

    public getButtonDetails() {
        const fileNames = ['_fonts.scss', 'fonts.scss'];
        const filePath = searchForProjectFiles(fileNames);

        if (filePath) {
            return {
                text: '$(list-ordered)', // Use any icon from VS Code's set of Octicons https://octicons.github.com/
                color: '#D58103',
                tooltip: 'View Fonts',
                command: 'extension.usefulFrameworkCompanion.fontsButton', // This is the command to run when the button is clicked
            };
        }

        console.error('Useful Framework Companion: Could not find a FONTS file in the active project');
        return null;
    }

    async onButtonPress() {
        const fileNames = ['_fonts.scss', 'fonts.scss'];
        const filePath = searchForProjectFiles(fileNames);

        if (filePath) {
            const document = await vscode.workspace.openTextDocument(filePath);
            vscode.window.showTextDocument(document, vscode.ViewColumn.Active);
        } else {
            console.error('Useful Framework Companion: Could not find a FONTS file in the active project');
        }
    }
}
