const mocIcon = require('../icons/logo/moc-logo.png');




// Svg icons
import { ic_approvalcenter } from "./svg/ic_approvalcenter";
import { ic_home } from "./svg/ic_home";
import { ic_subscrip } from "./svg/ic_subscrip";
import { ic_classs } from "./svg/ic_classs";
import { ic_account } from "./svg/ic_account";



// Define the type for the icons object
export type IconKeys = | 'ic_home'
| 'ic_subscrip'
| 'ic_classs'
| 'ic_account'
| 'ic_approvalcenter';

const icons: Record<IconKeys, string> = {
    ic_home,
    ic_approvalcenter,
    ic_subscrip,
    ic_classs,
    ic_account,
  
  };
  
  export default icons;