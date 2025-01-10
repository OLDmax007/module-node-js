import { IActionToken } from "../interfaces/action-token.interface";
import { ActionToken } from "../models/action-token.model";

class ActionTokenRepository {
  public async create(dto: Partial<IActionToken>): Promise<IActionToken> {
    return await ActionToken.create(dto);
  }

  public async deleteOneByParams(params: Partial<IActionToken>): Promise<void> {
    await ActionToken.deleteOne(params);
  }

  public async findByParams(
    params: Partial<IActionToken>
  ): Promise<IActionToken> {
    return await ActionToken.findOne(params);
  }
}

export const actionTokenRepository = new ActionTokenRepository();
