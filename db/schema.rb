# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180415163303) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friendships", force: :cascade do |t|
    t.integer "user_id"
    t.integer "friend_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "media", force: :cascade do |t|
    t.integer "media_type"
    t.text "media_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "memory_box_id"
    t.index ["memory_box_id"], name: "index_media_on_memory_box_id"
    t.index ["user_id"], name: "index_media_on_user_id"
  end

  create_table "memory_boxes", force: :cascade do |t|
    t.text "subject"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "time_capsule_id"
    t.index ["time_capsule_id"], name: "index_memory_boxes_on_time_capsule_id"
    t.index ["user_id"], name: "index_memory_boxes_on_user_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.text "name"
    t.string "room_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "users_count", default: 0
  end

  create_table "rooms_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "room_id", null: false
    t.index ["room_id", "user_id"], name: "index_rooms_users_on_room_id_and_user_id"
    t.index ["user_id", "room_id"], name: "index_rooms_users_on_user_id_and_room_id"
  end

  create_table "time_capsules", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.text "wrap_date"
    t.text "open_date"
    t.integer "direct_type", default: 0, null: false
    t.index ["user_id"], name: "index_time_capsules_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.string "name"
    t.text "image"
    t.text "bio"
<<<<<<< HEAD
    t.bigint "time_capsule_id"
=======
    t.integer "time_capsule_id"
>>>>>>> edit new capsule box
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["time_capsule_id"], name: "index_users_on_time_capsule_id"
  end

end
