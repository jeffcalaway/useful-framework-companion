import * as vscode from 'vscode';
import { searchForThemeFiles } from '../helpers/wordpress';

export class VariablesButton {
    constructor() {}

    public getButtonDetails() {
        const fileNames = ['_variables.scss', 'variables.scss', '_colors.scss', 'colors.scss'];
        const filePath = searchForThemeFiles(fileNames);

        if (filePath) {
            return {
                text: '$(symbol-color)',
                color: '#AB68FF',
                tooltip: 'View Variables',
                command: 'extension.usefulFrameworkCompanion.variablesButton',
            };
        }

        vscode.window.showInformationMessage('Could not find _variables.scss or _colors.scss in the active theme');
        return null;
    }

    async onButtonPress() {
        const fileNames = ['_variables.scss', 'variables.scss', '_colors.scss', 'colors.scss'];
        const filePath = searchForThemeFiles(fileNames);
        
        if (filePath) {
            const document = await vscode.workspace.openTextDocument(filePath);
            vscode.window.showTextDocument(document, vscode.ViewColumn.Active);
        } else {
            vscode.window.showInformationMessage('Could not find _variables.scss or _colors.scss in the active theme');
        }
    }
}