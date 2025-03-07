using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http.Features;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services
  .AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=Audit.db")
  );

builder.Services
  .AddCors(options => {
    options.AddPolicy("AllowedOrigins", policy => {
      policy.WithOrigins(
              "http://localhost:9000",
              "http://localhost:5173",
              "https://klevisimeri.github.io/AuditTest/"
            )
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
  });

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<LocalAccessControl>();
 
var jwtKeyString = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKeyString)) throw new ArgumentNullException(nameof(jwtKeyString), "Jwt:Key configuration is missing or empty.");
var key = Encoding.ASCII.GetBytes(jwtKeyString);
builder.Services
  .AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
  })
  .AddJwtBearer(options => {
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters {
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = new SymmetricSecurityKey(key),
      ValidateIssuer = false,
      ValidateAudience = false,
    };
  });

builder.Services.Configure<FormOptions>(options => {
  options.MultipartBodyLengthLimit = long.MaxValue;
});

builder.Services
  .AddControllers()
  .AddJsonOptions(options => {
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
  });

builder.Services
  .AddHttpLogging(logging =>{
    logging.LoggingFields = Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.None;
  });

var app = builder.Build();



if (app.Environment.IsDevelopment()) {
  app.UseSwagger();
  app.UseSwaggerUI();
}
app.UseHttpLogging();
app.UseHttpsRedirection();
app.UseCors("AllowedOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run("http://*:9000");



// using System.Security.Cryptography;
// using System.Security.Cryptography.X509Certificates;
// using Microsoft.AspNetCore.HostFiltering;
// Kestrel configuration with HTTPS
// builder.WebHost.ConfigureKestrel(serverOptions =>
// {
//     serverOptions.ListenAnyIP(9000, listenOptions =>
//     {
//         var certificate = X509Certificate2.CreateFromPemFile(
//             "/etc/ssl/certs/domain.cert.pem",
//             "/etc/ssl/private/private.key.pem"
//         );
//         listenOptions.UseHttps(options => {
//             options.ServerCertificate = certificate;
//             options.ServerCertificateSelector = (connectionContext, name) => {
//                 return certificate;
//             };
//         });
//     });
//     
//     serverOptions.Limits.MaxRequestBodySize = long.MaxValue;
// });


// builder.Services.Configure<HostFilteringOptions>(options =>
// {
//     options.AllowedHosts = new List<string>
//     {
//         "api.shkf-ks.org",
//         "[2a02:ab88:c0c:4c00:9cb6:b921:5967:4365]",
//         "[2a02:ab88:c0c:4c00::3299]"
//         "localhost"
//     };
// });

