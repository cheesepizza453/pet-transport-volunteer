import { LinkProps } from 'next/link';
import { ImageProps } from 'next/image';
import React, { ReactNode } from 'react';

export enum TYPE_LINK_TARGET {
    SELF,
    BLANK,
    NONE,
    PARENT,
    TBD
}

export interface IUiProps {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export interface IImage extends ImageProps {
    fallback?: string;
    backgroundColor?: string;
}

export interface IDictionary<T> {
    [index: string]: T;
}

export interface IButton extends IUiProps {
    link?: ILink;
    onClick?: (e: any) => void;
    label?: string;
}

export interface ILink {
    href: string;
    target?: TYPE_LINK_TARGET;
}

export interface IModal {
    isShow?: boolean;
    onClickClose?: () => void;
    onClickBackground?: () => void;
    content: ReactNode;
    renderTarget?: HTMLElement | null;
    buttonAriaLabel?: string;
    type: 'center' | 'bottom';
}
