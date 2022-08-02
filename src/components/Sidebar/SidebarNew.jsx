import SidebarItemNew from "./SidebarItemNew";
import sideBarItem from "./sidebarItem";

export default function SidebarNew() {
  return (
    <div className=" bg-blue-600">
      {sideBarItem.map((item, index) => (
        <SidebarItemNew key={index} item={item} />
      ))}
    </div>
  );
}
