import { ReactNode } from 'react';

interface ListItemProps {
  children: ReactNode;
}

function ListItem({ children }: ListItemProps) {
  return (
    <div className="flex p-3 my-2">
      <div className="h-4 w-4 mr-4 bg-pink" />
      <span className="text-white">{children}</span>
    </div>
  );
}

export default ListItem;
