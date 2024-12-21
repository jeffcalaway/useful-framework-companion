import * as vscode from 'vscode';
import { VariablesButton } from './buttons/variables';
import { HeadingsButton } from './buttons/headings';
import { FontsButton } from './buttons/fonts';
import { PackageButton } from './buttons/package';

export function activate(context: vscode.ExtensionContext) {
    let buttons = [
        new VariablesButton(),
        new HeadingsButton(),
        new FontsButton(),
        new PackageButton(),
    ];

    buttons.forEach(button => {
        let buttonDetails = button.getButtonDetails();
        
        if (buttonDetails !== null) {
            let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    
            statusBarItem.text = buttonDetails.text;
            statusBarItem.color = buttonDetails.color;
            statusBarItem.tooltip = buttonDetails.tooltip;
            statusBarItem.command = buttonDetails.command;
        
            context.subscriptions.push(statusBarItem);
            statusBarItem.show();
        
            let disposable = vscode.commands.registerCommand(buttonDetails.command, () => {
                button.onButtonPress();
            });
        
            context.subscriptions.push(disposable);
        }
    });    
}

export function deactivate() {}
