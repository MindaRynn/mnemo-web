require "sinatra"
require "google/cloud/storage"

class UploadController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    file_path = params[:file].tempfile.path
    file_name = params[:file].original_filename

    # Upload file to Google Cloud Storage bucket
    file = bucket.create_file file_path, file_name, acl: "public"

    # The public URL can be used to directly access the uploaded file via HTTP
    file.public_url

    render json: file.public_url
  end

  def bucket
    keyfile = File.join(Rails.root, 'app', 'assets', 'config', 'keyfile.json')

    $storage = Google::Cloud::Storage.new(
      project_id: "mnemo-194409",
      credentials: keyfile
    )

    $storage.bucket "mnemo-storage"
  end
end