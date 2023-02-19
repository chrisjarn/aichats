<script>
// Switch between Mobile and Desktop View
import { h, resolveComponent } from "vue"
import { deviceTypeByViewport } from '../utils/detectDevice.js'

import Contacts from "../views/Contacts.vue"
import DesktopLayout from "../layouts/DesktopLayout.vue"

export default {
	components: {
		Contacts,
		DesktopLayout,
	},
	// eslint-disable-next-line
	setup() {
		const MobileLayout = resolveComponent("Contacts")
		return () => {
			if (deviceTypeByViewport() == 'mobile') {
				return h(MobileLayout)
			} else {
				return h(DesktopLayout)
			}
		}
	},
}
</script>
