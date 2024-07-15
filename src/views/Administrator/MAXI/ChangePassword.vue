<template>
    <div>
        <base-header class="pb-6" type="">
            <div class="row align-items-center py-4">
                <div class="col-6">
                    <h6 class="h2 d-inline-block mb-0">Ubah Password</h6>
                </div>
                <div class="col-6 pt-2 d-flex justify-content-end">
                    <router-link to="" class="btn btn-primary">
                        <span class="hidden-sm-down">Simpan</span>
                    </router-link>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--6">
            <card>
                <base-input placeholder="Password Lama" type="password"></base-input>
                <base-input placeholder="Password Baru" type="password"></base-input>
                <base-input placeholder="Konfirmasi Password Baru" type="password"></base-input>
            </card>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

