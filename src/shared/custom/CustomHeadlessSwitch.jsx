import { Switch } from '@headlessui/react';
import React from 'react';
import { cx } from '../../utils/helper';

const CustomHeadlessSwitch = ({ isPrimary = false, ...props }) => {
    return (
        <Switch
            {...props}
            className={cx(
                "group inline-flex relative top-[1px] h-6 w-11 items-center rounded-full bg-text-disabled transition ",
                isPrimary ? 'data-[checked]:bg-main-black' : 'data-[checked]:bg-secondary-400'
            )}
        >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
    );
};

export default CustomHeadlessSwitch;