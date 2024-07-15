<template>
	<div>
		<base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">New Popup</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/dashboard">Administrator</router-link></li>
              <li class="breadcrumb-item"><router-link to="/administrator/inbox/listpopup">Popup</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Add New</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
		<div class="container-fluid mt--6 small">
      <div class="row">
        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <h3>01 Message</h3>
              </div>
              <div class="form-group">
                <el-input type="text" placeholder="Message Title"></el-input>
              </div>
              <div class="form-group">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="Message Body">
                </el-input>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <h3>02 Target User</h3>
              </div>
              <div class="form-group">
                <el-checkbox>All Users</el-checkbox>
              </div>
              <div class="form-group">
                <el-checkbox>AXI</el-checkbox>
              </div>
              <div class="form-group">
                <el-checkbox>MAXI</el-checkbox>
              </div>
              <div class="form-group">
                <el-checkbox>Nasabah</el-checkbox>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <h3>03 Destination</h3>
              </div>
              <div class="form-group">
                <el-radio v-model="radio" label="1">Message Page</el-radio>
              </div>
              <div class="form-group">
                <el-radio v-model="radio" label="2">Choose App Page</el-radio>
                <el-input type="text" v-if="radio == 2" placeholder="Insert/choose date"></el-input>
              </div>
              <div class="form-group">
                <el-radio v-model="radio" label="3">Insert External Link</el-radio>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <h3>Time to Send</h3>
              </div>
              <div class="form-group">
                <el-radio v-model="time" label="1">Send Immediately</el-radio>
              </div>
              <div class="form-group">
                <el-radio v-model="time" label="2">Schedule by date</el-radio>
              </div>
              <div class="form-group">
                <el-input type="text" placeholder="Insert/choose date" v-if="time == 2"></el-input>
              </div>
              <div class="form-group">
                <el-input type="text" placeholder="Insert/choose time" v-if="time == 2"></el-input>
              </div>
              <div class="form-group">
                <el-button type="primary">Save and Update</el-button>
                <el-button type="text">Save to draft</el-button>
              </div>
            </div>
          </div>
					<div class="card">
						<div class="card-body">
							<div class="form-group">
								<h3>Display Image</h3>
							</div>
							<div class="form-group">
								<input type="file" name="file" id="file">
							</div>
						</div>
					</div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import { Input, Checkbox, Radio, Button } from 'element-ui';

export default {
  components: {
    [Input.name]: Input,
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
    [Button.name]: Button
  },
  data () {
    return {
      radio: '1',
      time: '1'
    };
  }
}
</script>