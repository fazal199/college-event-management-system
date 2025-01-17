interface NavigationLink {
  text: string;
  link: string;
  icon?: any;
}

interface OrgEventsData {
  _id?: string;
  name: string;
  location: string;
  date: string;
  categoryname: string;
  status: string
}

interface EventRegisteredUser {
  _id?: string;
  username: string;
  email: string;
  date: string
}

export type { NavigationLink, OrgEventsData,EventRegisteredUser };
