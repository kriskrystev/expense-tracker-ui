import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { ExpenseUi } from "../../../../models/expenses/ui/expense";
import { PageMetaDto } from "../../../../core/dto/page-meta.dto";

export const adapter: EntityAdapter<ExpenseUi> = createEntityAdapter<ExpenseUi>();

export interface ExpenseState extends EntityState<ExpenseUi> {
    loading: boolean;
    metaData: PageMetaDto;
}

// TODO: define the metadata someplace else, that way you can reuse the default object
export const initialState: ExpenseState = adapter.getInitialState({
    loading: false,
    metaData: {
        take: 5,
        page: 1,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    }
});