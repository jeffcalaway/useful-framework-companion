import * as vscode from 'vscode';
import { searchForProjectFiles } from '../helpers/files';

export class VariablesButton {
    constructor() {}

    public getButtonDetails() {
        const fileNames = ['_variables.scss', 'variables.scss', '_colors.scss', 'colors.scss', 'constants.js'];
        const filePath = searchForProjectFiles(fileNames);

        if (filePath) {
            return {
                text: '$(symbol-color)',
                color: '#AB68FF',
                tooltip: 'View Variables',
                command: 'extension.usefulFrameworkCompanion.variablesButton',
            };
        }

        vscode.window.showInformationMessage('Could not find a VARIABLES file in the active project');
        return null;
    }

    async onButtonPress() {
        const fileNames = ['_variables.scss', 'variables.scss', '_colors.scss', 'colors.scss', 'constants.js'];
        const filePath = searchForProjectFiles(fileNames);
        
        if (filePath) {
            const document = await vscode.workspace.openTextDocument(filePath);
            vscode.window.showTextDocument(document, vscode.ViewColumn.Active);
        } else {
            vscode.window.showInformationMessage('Could not find a VARIABLES file in the active project');
        }
    }
}