export const TASK_STATUSES = {
  DRAFT: "draft",
  UNSOLVED: "unsolved",
  UNDER_REVIEW: "under-review",
  SOLVED: "solved",
  NEEDS_INFO: "needs-info",
};

export const SEVERITY_LEVELS = {
  CRITICAL: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

export const SOURCES = {
  HYPEJOB: "Hypejob",
  SOURCE_CODE: "Source Code",
  GETASTRA: "Getastra",
};

export const SORT_OPTIONS = {
  DATE: "date",
  SEVERITY: "severity",
  SCORE: "score",
  TITLE: "title",
};

export const DRAG_TYPES = {
  TASK: "task",
};

export const SEVERITY_COLORS = {
  [SEVERITY_LEVELS.CRITICAL]: "bg-error-100 text-error-700 border-error-200",
  [SEVERITY_LEVELS.HIGH]: "bg-warning-100 text-warning-700 border-warning-200",
  [SEVERITY_LEVELS.MEDIUM]: "bg-yellow-100 text-yellow-700 border-yellow-200",
  [SEVERITY_LEVELS.LOW]: "bg-success-100 text-success-700 border-success-200",
};

export const STATUS_COLORS = {
  [TASK_STATUSES.DRAFT]: "bg-gray-400",
  [TASK_STATUSES.UNSOLVED]: "bg-blue-500",
  [TASK_STATUSES.UNDER_REVIEW]: "bg-warning-500",
  [TASK_STATUSES.SOLVED]: "bg-success-500",
  [TASK_STATUSES.NEEDS_INFO]: "bg-purple-500",
};

export const SAMPLE_TASKS = [
  {
    id: "#8793",
    title: "Server Side Template Injection (Blind)",
    severity: SEVERITY_LEVELS.CRITICAL,
    source: SOURCES.HYPEJOB,
    score: 8.8,
    status: TASK_STATUSES.DRAFT,
    date: "3 Jan, 4:35 PM",
    verified: false,
    assignee: {
      name: "John Doe",
      avatar:
        "https://ui-avatars.com/api/?name=John+Doe&background=0ea5e9&color=fff",
    },
    description:
      "Server-side template injection vulnerability found in the application template engine.",
  },
  {
    id: "#8794",
    title: "svn/entries Found",
    severity: SEVERITY_LEVELS.LOW,
    source: SOURCES.HYPEJOB,
    score: 2.3,
    status: TASK_STATUSES.UNSOLVED,
    date: "3 Jan, 4:35 PM",
    verified: false,
    assignee: {
      name: "Jane Smith",
      avatar:
        "https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff",
    },
    description:
      "SVN entries file exposed, potentially revealing source code structure.",
  },
  {
    id: "#8795",
    title: "Q Web Key Set Disclosed",
    severity: SEVERITY_LEVELS.HIGH,
    source: SOURCES.SOURCE_CODE,
    score: 6.5,
    status: TASK_STATUSES.UNDER_REVIEW,
    date: "3 Jan, 4:35 PM",
    verified: true,
    assignee: {
      name: "Mike Johnson",
      avatar:
        "https://ui-avatars.com/api/?name=Mike+Johnson&background=f59e0b&color=fff",
    },
    description: "Web key set disclosure could lead to authentication bypass.",
  },
  {
    id: "#8796",
    title: "WordPress Database Backup File Found",
    severity: SEVERITY_LEVELS.MEDIUM,
    source: SOURCES.GETASTRA,
    score: 6.5,
    status: TASK_STATUSES.UNDER_REVIEW,
    date: "3 Jan, 4:35 PM",
    verified: false,
    assignee: {
      name: "Sarah Wilson",
      avatar:
        "https://ui-avatars.com/api/?name=Sarah+Wilson&background=8b5cf6&color=fff",
    },
    description:
      "Exposed WordPress database backup file containing sensitive information.",
  },
  {
    id: "#8797",
    title: "Phpmyadmin Information Schema Disclosure",
    severity: SEVERITY_LEVELS.CRITICAL,
    source: SOURCES.HYPEJOB,
    score: 6.5,
    status: TASK_STATUSES.SOLVED,
    date: "3 Jan, 4:35 PM",
    verified: false,
    assignee: {
      name: "Tom Brown",
      avatar:
        "https://ui-avatars.com/api/?name=Tom+Brown&background=ef4444&color=fff",
    },
    description:
      "PhpMyAdmin information schema disclosure vulnerability resolved.",
  },
  {
    id: "#8798",
    title: "Server Side Template Injection (Blind)",
    severity: SEVERITY_LEVELS.CRITICAL,
    source: SOURCES.SOURCE_CODE,
    score: 6.5,
    status: TASK_STATUSES.SOLVED,
    date: "3 Jan, 4:35 PM",
    verified: true,
    assignee: {
      name: "Lisa Davis",
      avatar:
        "https://ui-avatars.com/api/?name=Lisa+Davis&background=06b6d4&color=fff",
    },
    description:
      "Another instance of server-side template injection, now resolved.",
  },
  {
    id: "#8799",
    title: "PII Disclosure",
    severity: SEVERITY_LEVELS.CRITICAL,
    source: SOURCES.GETASTRA,
    score: 6.5,
    status: TASK_STATUSES.SOLVED,
    date: "3 Jan, 4:35 PM",
    verified: false,
    assignee: {
      name: "Chris Lee",
      avatar:
        "https://ui-avatars.com/api/?name=Chris+Lee&background=84cc16&color=fff",
    },
    description: "Personal identifiable information disclosure issue fixed.",
  },
  {
    id: "#8800",
    title: ".svn/entries Found",
    severity: SEVERITY_LEVELS.MEDIUM,
    source: SOURCES.GETASTRA,
    score: 6.5,
    status: TASK_STATUSES.SOLVED,
    date: "3 Jan, 4:35 PM",
    verified: false,
    assignee: {
      name: "Alex Johnson",
      avatar:
        "https://ui-avatars.com/api/?name=Alex+Johnson&background=f97316&color=fff",
    },
    description: "SVN entries exposure has been resolved.",
  },
  {
    id: "#8801",
    title: "JSON Web Key Set Disclosed",
    severity: SEVERITY_LEVELS.LOW,
    source: SOURCES.HYPEJOB,
    score: 6.5,
    status: TASK_STATUSES.SOLVED,
    date: "3 Jan, 4:35 PM",
    verified: false,
    assignee: {
      name: "Emma Wilson",
      avatar:
        "https://ui-avatars.com/api/?name=Emma+Wilson&background=ec4899&color=fff",
    },
    description: "JSON Web Key Set disclosure vulnerability patched.",
  },
  {
    id: "#8802",
    title: "WordPress Configuration File Found",
    severity: SEVERITY_LEVELS.LOW,
    source: SOURCES.GETASTRA,
    score: 6.5,
    status: TASK_STATUSES.NEEDS_INFO,
    date: "3 Jan, 4:35 PM",
    verified: false,
    assignee: {
      name: "Ryan Martinez",
      avatar:
        "https://ui-avatars.com/api/?name=Ryan+Martinez&background=14b8a6&color=fff",
    },
    description:
      "WordPress configuration file exposure needs more investigation.",
  },
];
