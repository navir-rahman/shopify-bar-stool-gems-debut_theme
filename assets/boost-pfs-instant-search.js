// Override Settings
var boostPFSInstantSearchConfig = {
	search: {
			//suggestionMode: 'test',
			//suggestionPosition: 'left'
	}
};

(function() {
	BoostPFS.inject(this);

	InstantSearchMobile.prototype.afterShowSearchBoxMobile = function(searchBoxId) {
		if (!searchBoxId) searchBoxId = this.searchBoxId;
		// Hide debut's search bar on mobile, and show our search bar instead
		if(jQ('.js-drawer-close').length > 0){
			setTimeout(function() {
				jQ('.js-drawer-close').trigger('click');
			});
		}
	};

	SearchInput.prototype.customizeInstantSearch= function() {
		// Hide debut's search suggestion
		if (jQ('.predictive-search-wrapper').length > 0){
				jQ('.predictive-search-wrapper').hide();
		}
	};

	function closeSuggestionMobile(searchBoxId, isCloseSearchBox) {
		/* console.log('closeSuggestionMobile'); */
		jQ(searchBoxId).autocomplete('close');
		jQ('.' + Class.searchSuggestion + '[data-search-box="' + searchBoxId + '"]').parent().hide();
		// Remove search box
		var isCloseSearchBox = typeof isCloseSearchBox !== 'undefined' ? isCloseSearchBox : false;
		if (isCloseSearchBox) jQ('.boost-pfs-search-suggestion-mobile-top-panel,.boost-pfs-search-suggestion-mobile-overlay').hide();
		// Update current term for all search boxes
		setValueAllSearchBoxes();
		// Add back tabindex=-1
		jQ('.boost-pfs-search-no-tabindex').attr('tabindex', -1);
		// Return scrolling of body
		if(jQ('body').hasClass(Class.searchSuggestionMobileOpen)){    
			jQ('body').removeClass(Class.searchSuggestionMobileOpen);
		}
		BoostPFS.afterCloseSuggestionMobile(searchBoxId, isCloseSearchBox);
	
		// Close search theme debut
		if(jQ('.js-drawer-close').length > 1){
			jQ('.js-drawer-close').trigger('click');
		}
	}
})();