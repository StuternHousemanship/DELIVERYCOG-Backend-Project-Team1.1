import { Model } from 'objection';

export class orderType extends Model {
    static get tableName() {
        return 'orders';
    }
};