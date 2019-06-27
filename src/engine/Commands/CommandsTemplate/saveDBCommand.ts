import { saveDatabase as saveUserDB } from '@engine/Users/actions';
import { Command, CommandList, CommandStatus } from '../Command';

export class SaveDBCommand implements Command {
  public payload: void;
  public readonly command = CommandList.saveDB;
  public status: CommandStatus;

  public eligible() {
    // saving is always possible
    return true;
  }

  public execute() {
    console.log('auto-save...');
    return [
      saveUserDB(),
    ];
  }
}
