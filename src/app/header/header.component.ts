import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() sections = [""];
  dropdownVisible = false;
  subscription: Subscription;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.dropdownOnToggle().subscribe((value)=>{      
      this.dropdownVisible=value;
    });
    
  }

  ngOnInit(): void {
    
  }

  toggleDropdown(){
    this.uiService.toggleDropdown();
    
  }

}
