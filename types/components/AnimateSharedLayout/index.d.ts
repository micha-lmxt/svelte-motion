/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import * as React from "react";
import { SharedLayoutProps, SharedLayoutSyncMethods } from "./types";
import { MotionContextProps } from "../../context/MotionContext";
import { VisualElement } from "../../render/types";
/**
 * @public
 */
export declare class AnimateSharedLayout extends React.Component<SharedLayoutProps, {}, VisualElement> {
    static contextType: React.Context<MotionContextProps>;
    /**
     * A list of all the children in the shared layout
     */
    private children;
    /**
     * As animate components with a defined `layoutId` are added/removed to the tree,
     * we store them in order. When one is added, it will animate out from the
     * previous one, and when it's removed, it'll animate to the previous one.
     */
    private stacks;
    /**
     * Track whether the component has mounted. If it hasn't, the presence of added children
     * are set to Present, whereas if it has they're considered Entering
     */
    private hasMounted;
    /**
     * Track whether we already have an update scheduled. If we don't, we'll run snapshots
     * and schedule one.
     */
    private updateScheduled;
    /**
     * Tracks whether we already have a render scheduled. If we don't, we'll force one with this.forceRender
     */
    private renderScheduled;
    /**
     * The methods provided to all children in the shared layout tree.
     */
    syncContext: SharedLayoutSyncMethods;
    componentDidMount(): void;
    componentDidUpdate(): void;
    shouldComponentUpdate(): boolean;
    private startLayoutAnimation;
    updateStacks(): void;
    private scheduleUpdate;
    private addChild;
    private removeChild;
    private addToStack;
    private removeFromStack;
    /**
     * Return a stack of animate children based on the provided layoutId.
     * Will create a stack if none currently exists with that layoutId.
     */
    private getStack;
    render(): JSX.Element;
}