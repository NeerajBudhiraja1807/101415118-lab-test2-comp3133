import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-missiondetails',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnInit {
  mission!: Mission;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.spacexService.getMissionById(+id).subscribe({
        next: (data) => {
          this.mission = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load mission details';
          this.loading = false;
          console.error('Error loading mission:', err);
        }
      });
    } else {
      this.error = 'No mission ID provided';
      this.loading = false;
    }
  }

  getLandingStatus(): string {
    const firstCore = this.mission?.rocket?.first_stage?.cores?.[0];
    if (!firstCore || firstCore.land_success === null) {
      return 'No landing data available';
    }
    return firstCore.land_success ? 'Successful landing' : 'Landing failed';
  }

  getLandingDetails(): string {
    const firstCore = this.mission?.rocket?.first_stage?.cores?.[0];
    if (!firstCore) return 'No core data available';
    
    const details = [];
    if (firstCore.landing_type) details.push(`Type: ${firstCore.landing_type}`);
    if (firstCore.landing_vehicle) details.push(`Vehicle: ${firstCore.landing_vehicle}`);
    if (firstCore.land_success !== null) details.push(`Success: ${firstCore.land_success ? 'Yes' : 'No'}`);
    
    return details.join(' • ') || 'No landing details available';
  }

  goBack(): void {
    this.location.back();
  }
}