import {
  ChatBubbleOutlineOutlined,
  ExpandMore,
  FilterAltOutlined,
  NavigateNext,
  Search,
  Settings,
  Undo,
  VisibilityOutlined,
} from "@mui/icons-material";

export const Icons = {
  logo: () => (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="84.000000pt"
      height="45.000000pt"
      viewBox="0 0 84.000000 45.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,45.000000) scale(0.100000,-0.100000)"
        fill="#FFFFFF"
        stroke="none"
      >
        <path
          d="M145 421 c-18 -7 -16 -10 15 -23 33 -14 40 -26 83 -128 39 -94 44
-115 34 -130 -22 -31 -78 -92 -81 -89 -2 2 -32 75 -67 161 -34 86 -67 154 -72
151 -20 -12 -47 -90 -47 -136 0 -120 85 -207 202 -207 131 1 217 95 206 226
-9 106 -96 185 -203 183 -27 0 -59 -4 -70 -8z m182 -111 c45 -27 53 -65 20
-98 l-26 -26 -9 25 c-5 13 -17 41 -26 63 -9 21 -16 42 -16 47 0 15 23 10 57
-11z"
        />
        <path
          d="M493 308 c3 -13 11 -60 17 -105 11 -76 14 -83 35 -83 21 0 24 7 35
83 6 45 14 92 17 105 4 15 1 22 -10 22 -11 0 -17 -17 -22 -68 -12 -119 -22
-114 -41 21 -4 32 -11 47 -21 47 -11 0 -14 -7 -10 -22z"
        />
        <path
          d="M633 323 c-17 -6 -18 -174 -1 -191 15 -15 51 -15 66 0 7 7 12 43 12
93 0 50 -5 86 -12 93 -12 12 -43 15 -65 5z m45 -88 c4 -83 -2 -103 -23 -85
-15 13 -21 112 -9 145 14 35 29 6 32 -60z"
        />
        <path
          d="M732 318 c3 -7 17 -14 31 -16 15 -2 27 -6 27 -8 0 -3 -13 -37 -30
-76 -40 -94 -40 -98 15 -98 53 0 66 27 16 32 l-30 3 30 70 c41 97 39 105 -17
105 -32 0 -44 -4 -42 -12z"
        />
      </g>
    </svg>
  ),
  search: Search,
  setting: Settings,
  google: () => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  ),
  eye: VisibilityOutlined,
  back: Undo,
  comment: ChatBubbleOutlineOutlined,
  expandMore: ExpandMore,
  right: NavigateNext,
  arrow_go_back: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 18h3.75a5.25 5.25 0 100-10.5H5M7.5 4L4 7.5 7.5 11"
      />
    </svg>
  ),

  login: () => (
    <svg
      width="45px"
      height="45px"
      viewBox="-5.52 -5.52 35.04 35.04"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999"
          stroke="#1C274C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827"
          stroke="#1C274C"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{" "}
      </g>
    </svg>
  ),
  filter: FilterAltOutlined,
};
