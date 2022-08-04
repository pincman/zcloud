import { Depart } from '@/modules/org/entities/depart.entity';
import { Enterprise } from '@/modules/org/entities/enterprise.entity';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BussinessGroupStage } from '../../interface';

/**
 * 商机组模型
 *
 * @export
 * @class BussinessGroup
 */
@Entity('customer_bussiness_groups')
export class BussinessGroup extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        comment: '商机组名称',
    })
    name!: string;

    @Column({
        comment: '阶段设置',
        type: 'simple-json',
    })
    stage?: BussinessGroupStage[];

    @Column({
        comment: '是否启用',
        default: false,
    })
    enabled?: boolean;

    /**
     * 商机组所属企业
     *
     * @type {Enterprise}
     * @memberof BussinessGroup
     */
    @ManyToOne(
        (type) => Enterprise,
        (enterprise) => enterprise.customer.bussinessGroups,
    )
    enterprise!: Enterprise;

    /**
     * 每个商机组可应用多个部门
     *
     * @type {Depart[]}
     * @memberof BussinessGroup
     */
    @ManyToMany((type) => Depart, (depart) => depart.customer.bussinessGroups)
    @JoinTable()
    departs!: Depart[];
}
