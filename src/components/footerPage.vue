<script setup>

</script>

<template>
    <!--  footer section -->
    <footer>
        <div class="foot-panel1">
            Back to top
        </div>
        <div class="foot-panel2">
            <ul>
                <p> Get to kmow us</p>
                <a href="#">About us</a>
                <a href="#">Blog </a>
                <a href="#">About </a>
                <a href="#">Products </a>
                <a href="#">Help </a>
            </ul>

            <ul>
                <p> Get to kmow us</p>
                <a href="#">About us</a>
                <a href="#">Blog </a>
                <a href="#">About </a>
                <a href="#">Products </a>
                <a href="#">Help </a>
            </ul>


        </div>

        <div class="foot-panel3">
            <div class="logo">
                <h1>ClickCart</h1>
            </div>
        </div>
        <div class="foot-panel4">
            <div class="pages">
                <a href="#"> Condition of use</a>
                <a href="#"> Privacy policies</a>
                <a href="#"> your Ads privacy uses</a>
            </div>
            <div class="copyright">
                &#169 1996-2023, ClickCart.com , Inc. or its affilates
            </div>
        </div>
    </footer>
    <!-- end of footer section -->
</template>

<style scoped>
/*  style for footer of the website  */

.foot-panel1 {
    background-color: #37475a;
    color: white;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;

}

.foot-panel2 {
    background-color: #222f3d;
    color: white;
    height: 250px;
    display: flex;
    justify-content: space-evenly;
}

ul a {
    display: block;
    margin-top: 10px;
    color: #dddddd;
    text-decoration: none;
}

ul {
    margin-top: 20px;
}

.foot-panel3 {
    background-color: #222f3d;
    border-top: 0.5px solid white;
    border-bottom: 0.5px solid white;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.logo {
    background-image: url("amazon_logo.png");
    height: 50px;
    width: 100px;
    background-size: cover;
    color: white;
}

.foot-panel4 {
    background-color: #222f3d;
    color: white;
    height: 55px;
}

.pages {
    display: flex;
    justify-content: center;
    padding-top: 5px;

}

div a {
    margin-left: 10px;
    color: white;
    text-decoration: none;
}

.copyright {
    display: flex;
    justify-content: center;
    margin-top: 5px;
}

/* end style for footer  */
</style>