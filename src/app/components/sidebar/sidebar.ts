import { Component } from '@angular/core';
import { SidebarItem } from "./sidebar-item/sidebar-item";
import { SidebarLogo } from "./sidebar-logo/sidebar-logo";
import { UserCard } from "./user-card/user-card";
import { LogoutButton } from "./logout-button/logout-button";

@Component({
  selector: 'app-sidebar',
  imports: [SidebarItem, SidebarLogo, UserCard, LogoutButton],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  
}
