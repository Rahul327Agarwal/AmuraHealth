export const handleClickOnSubMenu = (menuObject: Array<any>, menuName: string, subMenuName: string, childEventTrigger: Function): Array<any> => {
	let highlightedSubMenuList = JSON.parse(JSON.stringify(menuObject));
	loop: for (let i = 0; i < highlightedSubMenuList.length; i++) {
		if (highlightedSubMenuList[i].hasChildren) {
			for (let j = 0; j < highlightedSubMenuList[i].children.length; j++) {
				if (highlightedSubMenuList[i].children[j].header === menuName && highlightedSubMenuList[i].children[j].hasChildren) {
					highlightedSubMenuList[i].children[j].isActive = true;
					for (let z = 0; z < highlightedSubMenuList[i].children[j].children.length; z++) {
						if (highlightedSubMenuList[i].children[j].children[z].header === subMenuName) {
							highlightedSubMenuList[i].children[j].children[z].isActive = true;
							if (highlightedSubMenuList[i].children[j].children[z].childEventTrigger) {
								childEventTrigger("MyCustomer", "MyCustomer", highlightedSubMenuList[i].children[j].children[z].childEventTrigger, { key: new Date().getTime() })
								break loop;
							}
						}
					}
				}
			}
		}
	}
	return highlightedSubMenuList;
}

export const handleClickOnMenu = (menuObject: Array<any>, menuName: string, childEventTrigger: Function): Array<any> => {
	let highlightedMenuList = JSON.parse(JSON.stringify(menuObject));
	loop: for (let i = 0; i < highlightedMenuList.length; i++) {
		if (highlightedMenuList[i].hasChildren) {
			for (let j = 0; j < highlightedMenuList[i].children.length; j++) {
				if (highlightedMenuList[i].children[j].header === menuName) {
					highlightedMenuList[i].children[j].isActive = !highlightedMenuList[i].children[j].isActive
					if (highlightedMenuList[i].children[j].childEventTrigger) {
						childEventTrigger("MyCustomer", "MyCustomer", highlightedMenuList[i].children[j].childEventTrigger, { key: new Date().getTime() })
						break loop;
					}
				}
			}
		}
	}
	return highlightedMenuList;
}