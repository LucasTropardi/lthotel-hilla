import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';

interface ActionButtonProps {
  label: string;
  icon: string;
  onClick: () => Promise<void> | void;
  tooltipText: string;
  show: boolean;
}

interface ActionBarProps {
  buttons: ActionButtonProps[];
}

const ActionBar: React.FC<ActionBarProps> = ({ buttons }) => {
  return (
    <section className="actions">
      {buttons.map((button, index) => (
        button.show && (
          <Button key={index} theme="icon" aria-label={button.label} className='button' onClick={button.onClick}>
            <Tooltip slot="tooltip" text={button.tooltipText} />
            <Icon className={button.icon} />
          </Button>
        )
      ))}
    </section>
  );
};

export default ActionBar;
