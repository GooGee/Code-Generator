<template>
    <b-navbar id="bar" fixed="top" type="dark" variant="primary">
        <div class="container">
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/" exact active-class="active"> Home </b-nav-item>

                    <template v-if="sss.ready">
                        <b-nav-item v-for="item in sss.menuxx" :key="item.name" :to="item.path" active-class="active">
                            {{ item.name }}
                        </b-nav-item>
                    </template>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <template v-if="sss.ready">
                        <b-nav-item v-if="sss.oapi" @click="sss.oapi = false" to="/entity">Generator</b-nav-item>
                        <b-nav-item v-else @click="sss.oapi = true" to="/oapi">OpenAPI</b-nav-item>
                    </template>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'Bar',
    data() {
        return {
            sss,
        }
    },
}
</script>

<style>
#bar.navbar {
    padding: 0;
}

#bar a.nav-link.active,
#bar a.nav-link:hover {
    color: white;
    background-color: #08f;
}

#bar a.nav-link.active {
    font-weight: bolder;
    padding-left: 1rem;
    padding-right: 1rem;
}

#bar a.nav-link {
    color: rgba(255, 255, 255, 0.8);
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>
