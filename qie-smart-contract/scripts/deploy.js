import hre from "hardhat";

async function main() {
  console.log("Deploying QIEVault contract...");

  // Get the deployer's wallet address
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // 1. Get the Contract Factory
  const QIEVault = await hre.ethers.getContractFactory("QIEVault");

  // 2. Deploy the Contract
  // We pass 'deployer.address' as the 'aiAgent' argument for simplicity in the demo
  // This means YOUR wallet acts as both Owner and AI Agent.
  const vault = await QIEVault.deploy(deployer.address);

  // 3. Wait for deployment to finish
  await vault.waitForDeployment();

  const address = await vault.getAddress();

  console.log("----------------------------------------------------");
  console.log("✅ DEPLOYMENT SUCCESSFUL!");
  console.log("📄 Contract Address:", address);
  console.log("----------------------------------------------------");
  console.log("⚠️  SAVE THIS ADDRESS! YOU NEED IT FOR THE FRONTEND.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
