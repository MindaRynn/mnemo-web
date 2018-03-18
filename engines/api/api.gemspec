$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "api/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "api"
  s.version     = Api::VERSION
  s.authors     = ["MindaRyn"]
  s.email       = ["natcha.p@ku.th"]
  s.homepage    = "https://bitbucket.org/MindaRyn_/mnemo-web"
  s.summary     = "Api for MNEMO"
  s.description = "Expose all Api for MNEMO App"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.1.4"

  s.add_development_dependency "sqlite3"
end
