import type { SvelteComponent } from 'svelte';
import type { AnimatePresenceProps, MotionConfigProps, MotionProps, SharedLayoutProps } from '../../types'
import type { Motion, AnimatePresence, AnimateSharedLayout, MotionConfig, UseDomEvent } from '../../types';
import type { ConditionalGeneric } from '../../types/components/AnimatePresence';
import type { CustomMotionComponentConfig } from '../../types/render/dom/motion-proxy';
import type { IsSVG } from '../../types/render/dom/motion';
import type { UseDomEventProps } from '../../types/events/use-dom-event';
import { test, expectTypeOf, it, describe } from 'vitest';

describe('test component types', () => {
    it('should have proper type for Motion', () => {
        expectTypeOf<Motion>().toMatchTypeOf<SvelteComponent<CustomMotionComponentConfig & MotionProps & IsSVG, {}, {default: { props:object, motion: import('svelte/action').Action }}>>();
    })

    it('should have proper type for AnimatePresence', () => {
        expectTypeOf<AnimatePresence<any>>().toMatchTypeOf<SvelteComponent<AnimatePresenceProps<any>, {}, {default:{ item: ConditionalGeneric<any> }}>>();
    })

    it('should have proper type for AnimateSharedLayout', () => {
        expectTypeOf<AnimateSharedLayout>().toMatchTypeOf<SvelteComponent<SharedLayoutProps, {}, {default:{}}>>();
    })

    it('should have proper type for MotionConfig', () => {
        expectTypeOf<MotionConfig>().toMatchTypeOf<SvelteComponent<MotionConfigProps, {}, {default:{}}>>();
    })

    it('should have proper type for UseDomEvent', () => {
        expectTypeOf<UseDomEvent>().toMatchTypeOf<SvelteComponent<UseDomEventProps, {}, {default:{}}>>();
    })
})