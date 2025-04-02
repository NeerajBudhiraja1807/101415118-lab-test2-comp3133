export interface Mission {
    flight_number: number;
    mission_name: string;
    launch_year: string;
    details: string;
    links: {
      mission_patch_small: string;
      article_link: string;
      wikipedia: string;
      video_link: string;
    };
    rocket: {
      rocket_name: string;
      rocket_type: string;
      first_stage: {
        cores: {
          land_success: boolean | null;
          landing_type: string | null;
          landing_vehicle: string | null;
        }[];
      };
    };
    launch_success: boolean;
    // Remove land_success from here as it's not in the root of API response
}