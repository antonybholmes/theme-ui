import { IFieldMap } from 'interfaces/field-map'

//export const SITE = "https://edb.rdf-lab.org"
export const SITE_NAME = 'Experiments'
export const APP_NAME = SITE_NAME
// id for internally indentifying app and for use in prefixes etc
export const APP_ID = 'edb'
export const SITE_DOMAIN = 'edb.rdf-lab.org'

export const HEADER_SEP = '-'

export const ANIMATION_DURATION_S = 0.3
export const ANIMATION_DURATION_MS = 250

export const YEAR = new Date().getFullYear()

export const TEXT_SHOW_MORE = 'Show More'
export const TEXT_FILE = 'File'
export const TEXT_OPEN_FILE = 'Open files from this device'
export const TEXT_RUN = 'Run'

export const STATUS_CODE_OK = 200

export const STATUS_SUCCESS = 'success'
export const STATUS_FAIL = 'fail'

export const COLOR_THEME = 'theme'

export const TRUE = 'true'
export const FALSE = 'false'
export const TEXT_HOME = 'Home'
export const TEXT_OK = 'Ok'
export const TEXT_CANCEL = 'Cancel'
export const TEXT_CLOSE = 'Close'
export const TEXT_CLEAR = 'Clear'
export const TEXT_CONTINUE = 'Continue'
export const TEXT_CONFIRM = 'Confirm'
export const TEXT_OPTIONS = 'Options'
export const TEXT_SETTINGS = 'Settings'
export const TEXT_HISTORY = 'History'
export const TEXT_SAVE = 'Save'
export const TEXT_SAVE_AS = 'Save As'
export const TEXT_EXPORT = 'Export'
export const TEXT_RESET = 'Reset'
export const TEXT_UPDATE = 'Update'
export const TEXT_OPEN = 'Open'
export const TEXT_NEW = 'New'
export const TEXT_DRAG_HERE = 'Drop file here to open'
export const TEXT_DELETE = 'Delete'
export const TEXT_DISPLAY = 'Display'
export const TEXT_DOWNLOAD_AS_TXT = 'Download as TXT'
export const TEXT_DOWNLOAD_AS_CSV = 'Download as CSV'
export const TEXT_SHOW = 'Show'
export const TEXT_SIGN_IN = 'Sign In'
export const TEXT_NEXT = 'Next'
export const TEXT_SIGN_OUT = 'Sign Out'
export const TEXT_SELECT_ALL = 'Select all'
export const TEXT_UNSELECT_ALL = 'Unselect all'
export const TEXT_SEARCH = 'Search'
export const TEXT_UNLABELLED = '<Unlabelled>'
export const TEXT_ADD = 'Add'
export const TEXT_HELP = 'Help'
export const TEXT_NA = 'NA'
export const TEXT_ZOOM = 'Zoom'

export const COLOR_WHITE = '#ffffff'
export const COLOR_BLACK = '#000000'
export const COLOR_RED = '#ff0000'
export const COLOR_GREEN = '#00ff00'
export const COLOR_BLUE = '#0000ff'
export const COLOR_MEDIUM_SEA_GREEN = '#3cb371'
export const COLOR_GRAY = '#808080'
export const COLOR_LIGHTGRAY = '#C0C0C0'
export const COLOR_TRANSPARENT = '#00000000'
export const COLOR_CORNFLOWER_BLUE = '#6495ED'

export const SVG_CRISP_EDGES = 'crispEdges'

export interface IDialogParams {
  id: string
  params?: IFieldMap
}

export const NO_DIALOG: IDialogParams = { id: '' }

export const DEFAULT_DATE_FORMAT = 'MM/dd/yyyy'
