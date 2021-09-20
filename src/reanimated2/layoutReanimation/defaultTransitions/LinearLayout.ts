import { BaseAnimationBuilder } from '../animationBuilder/BaseAnimationBuilder';
import {
  ILayoutAnimationBuilder,
  LayoutAnimationFunction,
} from '../animationBuilder/commonTypes';

export class LinearLayout
  extends BaseAnimationBuilder
  implements ILayoutAnimationBuilder {
  static createInstance(): LinearLayout {
    return new LinearLayout();
  }

  build = (): LayoutAnimationFunction => {
    const delayFunction = this.getDelayFunction();
    const [animation, config] = this.getAnimationAndConfig();
    const callback = this.callbackV;
    const delay = this.delayV;

    return (values) => {
      'worklet';
      return {
        initialValues: {
          originX: values.boriginX,
          originY: values.boriginY,
          width: values.bwidth,
          height: values.bheight,
        },
        animations: {
          originX: delayFunction(delay, animation(values.originX, config)),
          originY: delayFunction(delay, animation(values.originY, config)),
          width: delayFunction(delay, animation(values.width, config)),
          height: delayFunction(delay, animation(values.height, config)),
        },
        callback: callback,
      };
    };
  };
}

export const Layout = LinearLayout;
