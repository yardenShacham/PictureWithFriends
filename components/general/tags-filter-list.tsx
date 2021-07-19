import * as React from 'react';
import {ItemList} from 'components/common/item-list';
import {inject, observer} from 'mobx-react';
import {APP_VIEW_STORES} from 'configuration-and-constants/app-configuration';
import {IMainPageViewStore} from 'typescript/view-stores';
import {textStyle as getTextStyle} from 'utils/styles-utils';
interface ITagsFilterListProps {
  mainPageViewStore?: IMainPageViewStore;
}

const TagsFilterList = ({mainPageViewStore}: ITagsFilterListProps) => (
  <ItemList
    onRemoveItem={mainPageViewStore?.removeTagFilter}
    getDisplayName={(item: string) => item}
    getId={(item: string) => item}
    items={mainPageViewStore?.selectedTagsFilter || []}
    textStyle={getTextStyle('h5')}
  />
);

export default inject(APP_VIEW_STORES.MAIN_PAGE_VIEW_STORE)(
  observer(TagsFilterList),
);
