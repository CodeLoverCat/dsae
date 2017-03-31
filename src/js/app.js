'use strict';
$(document).ready(function () {
    
    /********************************************
    TypeAhead -- Search AutoComplate
    ********************************************/
    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;
            matches = [];
            substrRegex = new RegExp(q, 'i');
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });
            cb(matches);
        };
    };
    var categories = ['Women','Men','Accessories','Home & Decor','Sale','VIP','New Arrivals','Tops & Blouses','Pants & Denim','Dresses & Skirts','New Arrivals','Shirts','Tees, Knits and Polos','Pants & Denim','Eyewear','Jewelry','Shoes','Bags & Luggage','Books & Music','Bed & Bath','Electronics','Decorative Accents','Blazers','French Cuff Cotton Twill Oxford','Slim fit Dobby Oxford Shirt','Plaid Cotton Shirt','Sullivan Sport Coat','Linen Blazer','Stretch Cotton Blazer','Chelsea Tee','Merino V-neck Pullover Sweater','Lexington Cardigan Sweater','Core Striped Sport Shirt','Bowery Chino Pants','The Essential Boot Cut Jean','Flat Front Trouser','NoLIta Cami','Black NoLIta Cami','Tori Tank','Delancy Cardigan Sweater','Ludlow Oxford Top','Elizabeth Knit Top','Essex Pencil Skirt','Racer Back Maxi Dress','Sheath','Convertible Dress','Park Avenue Pleat Front Trousers','Aviator Sunglasses','Jackie O Round Sunglasses','Retro Chic Eyeglasses','Barclay dOrsay pump, Nude','Ann Ankle Boot','Hana Flat, Charcoal','Dorian Perforated Oxford','Wingtip Cognac Oxford','Suede Loafer, Navy','Isla Crossbody Handbag','Florentine Satchel Handbag','Flatiron Tablet Sleeve','Broad St. Flapover Briefcase','Houston Travel Wallet','Roller Suitcase','Classic Hardshell Suitcase 21','Classic Hardshell Suitcase 29','Body Wash with Lemon Flower Extract and Aloe Vera','Bath Minerals and Salt','Shea Enfused Hydrating Body Lotion','Titian Raw Silk Pillow','Shay Printed Pillow','Carnegie Alpaca Throw','Park Row Throw','Gramercy Throw','Herald Glass Vase','Modern Murray Ceramic Vase','Stone Salt and Pepper Shakers','Fragrance Diffuser Reeds','Geometric Candle Holders','Madison LX2200','Madison RX3400','16GB Memory Card','8GB Memory Card','Large Camera Bag','Madison Earbuds','Madison Overear Headphones','Madison 8GB Digital Media Player','Compact mp3 Player','Ludlow Sheath Dress','Lafayette Convertible Dress','TriBeCa Skinny Jean','DUMBO Boyfriend Jean','Classic Hardshell Suitcase','Luggage Set','Vase Set','3-Year Warranty','5-Year Warranty','Camera Travel Set','MP3 Player with Audio','Pillow and Throw Set','A Tale of Two Cities','Olvidalo by Brownout','Alice in Wonderland','Khaki Bowery Chino Pants','Core Striped Sport Shirt-Indigo-XL','Classic Hardshell Suitcase 19','1-Year Members Only Shopping','Pearl Strand Necklace','Pearl Strand Necklace-18','Pearl Strand Necklace-24','Blue Horizons Bracelets','Pearl Stud Earrings','Swing Time Earrings','Silver Desert Necklace','Swiss Movement Sports Watch','Pearl Necklace Set','Around the World in 80 Days','Falling by I Am Not Lefthanded','If You Were by Keshco','Cant Stop It by Shearer','Love is an Eternal Lie by The Sleeping Tree','Goin Down to the Bus Stop by TBird','Fire [Kalima remix] by Unannounced Guest','Madison Island VIP Membership - 1 Year','Thomas Overcoat','Draper Suit Coat','Lincoln Blazer','Bushwick Skinny Jean','Draper Pant','Olive Bushwick Skinny Jean','Avery Oxford Shirt','Slim-fit Dobby Oxford Shirt','Carroll Check Dress Shirt','Clark Dress Shirt','Striped Crew Tee','Oatmeal Henley Tee','Henley Tee','Villa Bermuda Shorts','Cornelia Skirt','Grand Slim Straight Jean','Hester Ankle Pant','Angela Wrap Dress','Jane Dress','Jacqueline Medallion Dress','Ludlow Seersucker Top','Gans Trench Coat','Sheri Collar Shirt','Charcoal Sheri Collar Shirt','Milli Cardigan','Stretch Cotton Camisole','Noa Sheer Blouse','Brooklyn Jean Jacket','Mercer Loafer','Broad St Saddle Shoes','Empire Oxford','Lenox Boot','Studio Dress Shoe','Carnegie Sneaker','Hudson Snakeskin Pump','Prima Pump','Plaza Platform','Annie Pump','Broadway Pump','Ellis Flat','Yuca Sneaker','NoLIta Cami-Pink-L','Black Nolita Cami-Black-XS','Black Nolita Cami-Black-S','Elizabeth Knit Top-Pink-S','Elizabeth Knit Top-Pink-M','Elizabeth Knit Top-Pink-L','Elizabeth Knit Top-Red-S','Elizabeth Knit Top-Red-M','Elizabeth Knit Top-Red-L','Elizabeth Knit Top-Royal Blue-S','Elizabeth Knit Top-Royal Blue-M','Elizabeth Knit Top-Royal Blue-L','Plaid Cotton Shirt-Khaki-S','Plaid Cotton Shirt-Khaki-M','Plaid Cotton Shirt-Khaki-L','Plaid Cotton Shirt-Red-S','Plaid Cotton Shirt-Red-M','Plaid Cotton Shirt-Red-L','Plaid Cotton Shirt-Royal Blue-S','Plaid Cotton Shirt-Royal Blue-M','Plaid Cotton Shirt-Royal Blue-L'];
    $('#search-input-head .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'categories',
        source: substringMatcher(categories)
    });
    
    /********************************************
    MatchHeight of Section
    ********************************************/
    $(function() {
        $('.matchHeightItem').matchHeight();
        $('.matchHeightWidgetItem').matchHeight();
    });
    
    /********************************************
    Sticky Header -- Hide Top Header While Scroll Down
    ********************************************/
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var headerHeight = $('header').outerHeight();
    var topNavHeight = $('.header-top-area').outerHeight();
    var headerMainHeight = $('.header-main-area').outerHeight();
    $(window).scroll(function(event){
        didScroll = true;
    });
    setInterval(function() {
        if (didScroll) {hasScrolled();didScroll = false;}
    }, 250);
    function hasScrolled() {
        var st = $(this).scrollTop();
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > lastScrollTop && st > headerHeight){
            // Scroll Down
            $('header').removeClass('fixed-down').addClass('fixed-up');
            $('.fixed-up').css('top', -(topNavHeight + headerMainHeight));
        } else {
            // Scroll Up
            $('.fixed-up').css('top', '0');
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('fixed-up').addClass('fixed-down');
            }
        }
        lastScrollTop = st;
    };
    $('body').css('padding-top', headerHeight);
    
    /********************************************
    Product Quantity Box : Spinner/Number Input
    ********************************************/
    $(function () {
        $('.spinner .btn:first-of-type').on('click', function () {
            var btn = $(this);
            var input = btn.closest('.spinner').find('input');
            if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {
                input.val(parseInt(input.val(), 10) + 1);
            }
            else {
                btn.next("disabled", true);
            }
        });
        $('.spinner .btn:last-of-type').on('click', function () {
            var btn = $(this);
            var input = btn.closest('.spinner').find('input');
            if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
                input.val(parseInt(input.val(), 10) - 1);
            }
            else {
                btn.prev("disabled", true);
            }
        });
    });
    
    /********************************************
    Chosen -- Fancy Dropdown design : Convert Select tag into Fancy Dropdown
    ********************************************/
    $(".fancy-dropdown").chosen({disable_search_threshold: 10})
});

/********************************************
Fotorama -- Product View Image Gallery : Slider with Thumbnails
********************************************/
function loadFotorama() {
    if ($(window).width() < 768) {
       var dataNav = 'dots'
       var dataArrows = false
    } else {
       var dataNav = 'thumbs'
       var dataArrows = 'always'
    }
    $('.fotorama').fotorama({
        minwidth: '100%',
        thumbwidth: '80',
        thumbheight: '80',
        fit: 'contain',
        thumbfit: 'contain',
        click: false,
        swipe: true,
        thumbmargin: 15,
        allowfullscreen: true,
        nav: dataNav,
        arrows: dataArrows,
        loop: true,
        shadows: false
    });
}