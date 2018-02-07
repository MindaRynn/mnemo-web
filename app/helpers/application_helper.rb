module ApplicationHelper
  def csrf_token
    tags = csrf_meta_tags.split("\n")
    content = tags[1].split(' ')[-2]
    token = content[9..-2]
  end
end
