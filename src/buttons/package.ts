import * as vscode from 'vscode';
import { searchForProjectFiles } from '../helpers/files';

export class PackageButton {
    constructor() {}

    public getButtonDetails() {
        const fileNames = ['package.json'];
        const filePath = searchForProjectFiles(fileNames);

        if (filePath) {
            return {
                text: '$(output)', // Use any icon from VS Code's set of Octicons https://octicons.github.com/
                color: '#0585E0',
                tooltip: 'View Package',
                command: 'extension.usefulFrameworkCompanion.packageButton', // This is the command to run when the button is clicked
            };
        }

        vscode.window.showInformationMessage('Could not find a PACKAGE file in the active project');
        return null;
    }

    async onButtonPress() {
        const fileNames = ['package.json'];
        const filePath = searchForProjectFiles(fileNames);

        if (filePath) {
            const document = await vscode.workspace.openTextDocument(filePath);
            vscode.window.showTextDocument(document, vscode.ViewColumn.Active);
        } else {
            vscode.window.showInformationMessage('Could not find a PACKAGE file in the active project');
        }
    }
}
