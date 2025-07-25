export interface IContentSizeItem {
  left: number;
  width: number;
  padding: number;
}

export interface IColumnSizeItem {
  left: number;
  width: number;
  gap: number;
}

export interface IContentSize {
  width: number;
  clientWidth: number;

  height: number;
  heightVH: number;

  minHeight: number;

  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  content: IContentSizeItem;
  column: IColumnSizeItem;

  header: {
    height: number;
  };
}
